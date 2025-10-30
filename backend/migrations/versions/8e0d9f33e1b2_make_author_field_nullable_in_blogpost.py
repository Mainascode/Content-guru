"""Make author field nullable in BlogPost

Revision ID: 8e0d9f33e1b2
Revises: 40694215cfcc
Create Date: 2025-10-30 11:58:04.743675
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '8e0d9f33e1b2'
down_revision = '40694215cfcc'
branch_labels = None
depends_on = None


def upgrade():
    # ✅ Only alter the author column to be nullable
    with op.batch_alter_table('blog_posts') as batch_op:
        batch_op.alter_column('author',
                              existing_type=sa.String(length=120),
                              nullable=True)


def downgrade():
    # 🔁 Revert author column to NOT NULL
    with op.batch_alter_table('blog_posts') as batch_op:
        batch_op.alter_column('author',
                              existing_type=sa.String(length=120),
                              nullable=False)
