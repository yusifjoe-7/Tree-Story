
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class Option(Base):
    __tablename__ = "option"

    id: Mapped[str] = mapped_column(primary_key=True)
    story_id: Mapped[str] = mapped_column(ForeignKey("story.id"))
    node_id: Mapped[str] = mapped_column(ForeignKey("node.id"))
    next_node_id: Mapped[str] = mapped_column(ForeignKey("node.id"))
    value: Mapped[str] = mapped_column(String)

    relationship("Story",back_populates="options")
    relationship("Node",back_populates="options")