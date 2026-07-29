from pydantic import BaseModel
from .request import Story_request


class Option(BaseModel):
    id:str
    value:str
    next_node_id:str = None


class Node(BaseModel):
    id:str
    view:str
    is_end_node:bool = False
    is_winning_node:bool  = False
    is_start_node:bool = False
    options:list[Option] = []




class Story(Story_request):
    title:str
    story:list[Node]