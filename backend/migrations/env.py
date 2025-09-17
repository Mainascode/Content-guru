import logging
from logging.config import fileConfig

from alembic import context
from server.app import app, db
import server.models  # make sure all models are imported so migrations detect changes

# Alembic Config object
config = context.config

# Logging
fileConfig(config.config_file_name)
logger = logging.getLogger("alembic.env")

# Target metadata for autogenerate
target_metadata = db.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    with app.app_context():
        url = app.config["SQLALCHEMY_DATABASE_URI"]
        context.configure(
            url=url, target_metadata=target_metadata, literal_binds=True
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
                compare_type=True,           # detect column type changes
                compare_server_default=True  # detect server default changes
            )

            with context.begin_transaction():
                context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
