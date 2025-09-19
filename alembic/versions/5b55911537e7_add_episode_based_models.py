"""Add episode-based models

Revision ID: 5b55911537e7
Revises: 3fe18b10071e
Create Date: 2025-09-19 18:13:25.925112

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5b55911537e7'
down_revision: Union[str, Sequence[str], None] = '3fe18b10071e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
