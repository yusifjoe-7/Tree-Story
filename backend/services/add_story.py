from schemas.story import Node as sc_node, Option as Op
from models.node import Node
from models.option import Option

from sqlalchemy.ext.asyncio import AsyncSession



async def add_options(options:list[Op], node_id:str, id:str, db:AsyncSession):
    optionsList =[]
    for option in options:
        the_option_object = Option(
            id = option.id,
            story_id = id,
            node_id = node_id,
            next_node_id = option.next_node_id,
            value = option.value
        )
        optionsList.append(the_option_object)
        db.add_all(optionsList)
        await db.commit()

        for node in optionsList:
            await db.refresh(node)





async def add_node_to_db(data:list[sc_node], id:str, db:AsyncSession):
    finalList=[]
    for node in data:
        the_object = Node(
            id = node.id,
            story_id = id,
            view = node.view,
            is_end_node= node.is_end_node,
            is_start_node= node.is_start_node,
            is_winning_node= node.is_winning_node
        )
        finalList.append(the_object)
        #node["options"]
        await add_options(node.options ,node.id, id,  db)


    db.add_all(finalList)
    await db.commit()

    for node in finalList:
        await db.refresh(node)

    #return True



