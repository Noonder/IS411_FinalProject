from fastapi import FastAPI, HTTPException
from sqlmodel import Session,select
from database import engine, init_db
from models import TripDB,Trip,TripOut,TripFilter

init_db()
app = FastAPI()

@app.post("/trips/")
async def read_all_trip(Filter:TripFilter) -> list[TripOut]:
    with Session(engine) as session:
        statement = select(TripDB) \
            .where(TripDB.duration >= filter.duration) \
            .where(TripDB.group_size >= filter.group_size)
        all_trip = session.exec(statement).all()
       
        if all_trip != None:
            print(all_trip)
            return all_trip
   
    raise HTTPException(
        status_code=404,
        detail= 'Trip id not found',
    )
   

def insert_trip():
     trip_1 = TripDB(name='W&T 001', destination='Florida',
                duration=60, price=160000, group_size=1)
     trip_2 = TripDB(name='W&T 002', destination='Alaska',
                duration=60, price=160000, group_size=1)
     
     with Session(engine) as session :
        session.add(trip_1)
        session.add(trip_2)
        session.commit()

