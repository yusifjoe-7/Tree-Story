

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class Story(Base):
    __tablename__ = "story"

    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str | None] = mapped_column(String, nullable=True)

    relationship("Node",back_populates="story")
    relationship("Option",back_populates="story")