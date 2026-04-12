# In this step we will divide the data into various segment's like age, interest, location based on data ingestion

from app.core.database import db

user_collection=db["users"] # this is the dictionary where i will store the data from the users.

async def segment_users():

    pipeline=[
        {
            "$group":{
                "_id":"$location",
                "count":{"$sum":1}
            }
        }
    ]

    result=[]

    async for doc in user_collection.aggregate(pipeline):
        result.append(doc)

        return result
    

    # Now based on age we will differtiate the things whether to go for professional or beginner.

def segment_user(users):

    age=users.get("age")
    interest=users.get("interest", "").strip()

        # Level Beginner or professional based on age
    level= "Beginner" if age<25 else "Professional"

        # Segment what to call them
    segment=f"{interest} Beginner -{level}"

    return segment


    

