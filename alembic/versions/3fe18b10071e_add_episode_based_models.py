"""Add episode-based models

Revision ID: 3fe18b10071e
Revises: 9895385c4691
Create Date: 2025-09-19 18:12:52.202164

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3fe18b10071e'
down_revision: Union[str, Sequence[str], None] = '9895385c4691'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
