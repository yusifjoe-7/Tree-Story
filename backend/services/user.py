from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.story import Story


async def get_stories(db:AsyncSession):
    result = await db.execute(
        select(Story)
    )
    return result.scalars().all()