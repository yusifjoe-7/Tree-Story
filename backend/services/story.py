from models.story import Story

from sqlalchemy.ext.asyncio import AsyncSession

async def add_story(title:str, id:str, db:AsyncSession):
    story = Story(
        id = id,
        title = title
    )
    db.add(story)
    await db.commit()
    await db.refresh(story)

