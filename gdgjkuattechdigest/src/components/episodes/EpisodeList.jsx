// src/components/episodes/EpisodeList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader } from 'lucide-react';
import EpisodeCard from './EpisodeCard';
import { episodeService } from '../../services';

const EpisodeList = ({ searchQuery = '', selectedTrack = '', limit = 12 }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Wrap loadEpisodes in useCallback to memoize it and prevent infinite re-renders
  const loadEpisodes = useCallback(async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setSkip(0);
      } else {
        setLoadingMore(true);
      }

      const currentSkip = reset ? 0 : skip;
      const data = await episodeService.getAllEpisodes(currentSkip, limit);
      
      let filteredData = data;

      // Filter by search query
      if (searchQuery) {
        filteredData = filteredData.filter(episode =>
          episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          episode.content?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by track (assuming track info is in title or content)
      if (selectedTrack) {
        filteredData = filteredData.filter(episode =>
          episode.title.toLowerCase().includes(selectedTrack.toLowerCase())
        );
      }

      if (reset) {
        setEpisodes(filteredData);
      } else {
        setEpisodes(prev => [...prev, ...filteredData]);
      }

      setHasMore(data.length === limit);
      setSkip(currentSkip + limit);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchQuery, selectedTrack, skip, limit]); // Add all dependencies used inside the function

  useEffect(() => {
    loadEpisodes(true);
  }, [loadEpisodes]); // Now loadEpisodes is properly included in dependencies

  const handleLikeUpdate = (episodeNumber, newLikeCount) => {
    setEpisodes(prev => 
      prev.map(episode => 
        episode.episode_number === episodeNumber 
          ? { ...episode, like_count: newLikeCount }
          : episode
      )
    );
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadEpisodes(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading episodes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Episodes</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => loadEpisodes(true)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Episodes Found</h3>
          <p className="text-gray-600">
            {searchQuery || selectedTrack 
              ? "Try adjusting your search or filter criteria."
              : "No episodes have been published yet."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {episodes.length} episode{episodes.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            onLikeUpdate={handleLikeUpdate}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loadingMore ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Episodes'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;