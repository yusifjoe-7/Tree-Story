
from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class Node(Base):
    __tablename__ = "node"

    id: Mapped[str] = mapped_column(primary_key=True)
    story_id: Mapped[str] = mapped_column(ForeignKey("story.id"))
    next_node_id: Mapped[str | None] = mapped_column(
        ForeignKey("node.id"), nullable=True
    )

    view: Mapped[str] = mapped_column(String)
    is_end_node: Mapped[bool] = mapped_column(Boolean, default=False)
    is_winning_node: Mapped[bool] = mapped_column(Boolean, default=False)
    is_start_node: Mapped[bool] = mapped_column(Boolean, default=False)

    relationship("Option",back_populates="nodes")
    relationship("Story",back_populates="node")