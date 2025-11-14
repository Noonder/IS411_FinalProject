from pydantic import BaseModel
from sqlmodel import Field,Session,SQLModel,create_engine

class TripDB(SQLModel,table = True):
    id : int | None = Field(default=None, primary_key=True)
    name : str
    destination :str
    duration : int
    price : float
    group_size : int

class Trip(BaseModel):
    name : str
    destination : str
    duration : int
    price : float
    group_size : int


class TripOut(Trip):
    id : int

class TripFilter(BaseModel):
    duration: int
    group_size: int

engine = create_engine("sqlite:///data.db")
SQLModel.metadata.create_all(engine)