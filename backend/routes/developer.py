from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.story import Story

from db.get import get_db
from services.add_story import add_node_to_db
from services.story import add_story

router = APIRouter(prefix="/dev", tags=["dev"])

@router.post("/")
async def main(
    data: Story,
    db:AsyncSession = Depends(get_db)
    
):
    await add_story(data.title, data.id, db)
    await add_node_to_db(data.story, data.id, db)

    return {"Message":"Done"}