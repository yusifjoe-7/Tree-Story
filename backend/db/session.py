from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from core.config import settings



engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,  # Set to True to log raw SQL queries
    future=True,
    pool_pre_ping=True,  # Automatically check & reconnect dead pooled connections
)


AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Prevents attributes from expiring after commit in async context
    autoflush=False,
)

