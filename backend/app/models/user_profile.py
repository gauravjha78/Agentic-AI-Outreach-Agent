# Structure schema using pydantic the important part for validation

from typing import Annotated, Literal , Optional
from pydantic import BaseModel , EmailStr

class Profile(BaseModel):
    name:str
    age:int
    location:str
    interest:str
    # change email email:Optional[str]=None to the valid Email part using pydantic
    email: EmailStr

