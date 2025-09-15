import logging
from logging.config import fileConfig

from alembic import context
from flask import current_app

# Import your app + db
from server.app import app, db
import server.models  # make sure this file imports all your models

# Alembic Config object, gives access to .ini values
config = context.config

# Setup Python logging
fileConfig(config.config_file_name)
logger = logging.getLogger("alembic.env")

# Expose SQLAlchemy metadata to Alembic
target_metadata = db.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = app.config["SQLALCHEMY_DATABASE_URI"]
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    with app.app_context():
        connectable = db.engine

        with connectable.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata,
                compare_type=True,
                compare_server_default=True,
            )

            with context.begin_transaction():
                context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
