"""Initial migration

Revision ID: 9895385c4691
Revises: 7e0351bcdd17
Create Date: 2025-09-18 10:24:31.874867

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9895385c4691'
down_revision: Union[str, Sequence[str], None] = '7e0351bcdd17'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
