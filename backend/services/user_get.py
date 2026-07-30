from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from models.story import Story
from models.node import Node
from models.option import Option

from fastapi import HTTPException, status

async def get_story(db: AsyncSession, id: str):
    result = await db.execute(
        select(Story).where(Story.id == id)
    )
    return result.scalar_one_or_none()


async def get_nodes(db: AsyncSession, id: str):
    result = await db.execute(
        select(Node).where(Node.story_id == id)
    )
    return result.scalars().all()


async def get_options(db: AsyncSession, id: str):
    result = await db.execute(
        select(Option).where(Option.story_id == id)
    )
    return result.scalars().all()


def build(node_id: str | None, node_map, options_map):
    if node_id is None or node_id not in node_map:
        return None

    node = node_map[node_id]
    options = options_map.get(node_id, [])

    return {
        "id":node.id,
        "view": node.view,
        "is_end_node": node.is_end_node,
        "is_winning_node": node.is_winning_node,
        "options": [
            {
                "value": n.value,
                "nextNode": build(n.next_node_id, node_map, options_map)
            }
            for n in options
        ]
    }


async def get_a_story(db: AsyncSession, id: str):
    story = await get_story(db, id)

    if story is None:
        raise HTTPException(status_code=404, detail="story can't found")
    
    nodes = await get_nodes(db, id)
    options = await get_options(db, id)

    print("nodes:", [(n.id) for n in nodes])
    print("options:", [(o.id, o.node_id) for o in options])

    node_map = {n.id: n for n in nodes}
    options_map = {}
    for choice in options:
        options_map.setdefault(choice.node_id, []).append(choice)

    start_node = next((n for n in node_map.values() if n.is_start_node), None)

    return {
        "id": story.id,
        "title": story.title,
        "story": build(start_node.id if start_node else None, node_map, options_map)
    }