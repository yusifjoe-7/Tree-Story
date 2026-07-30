export type story = {
    id:string;
    title:string;
    story: StoryNode;
}

export type StoryOption = {
  value: string;
  nextNode: StoryNode;
}

export type StoryNode ={
  id: string;
  view: string;
  is_start_node: boolean;
  is_end_node: boolean;
  is_winning_node: boolean;
  options: StoryOption[];
}

