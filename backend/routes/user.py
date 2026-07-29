from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from db.get import get_db

from services.user import get_stories
from services.user_get import get_a_story

from schemas.request import Story_request


router = APIRouter()


@router.get("/stories")
async def main(
    db:AsyncSession = Depends(get_db)
):
    return await get_stories(db)



@router.get("/story")
async def story_rout(
    data : Story_request,
    db:AsyncSession = Depends(get_db)
):
    return await get_a_story(db, data.id)

