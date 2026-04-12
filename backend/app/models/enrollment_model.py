from pydantic import BaseModel

class Enrollment(BaseModel):
    name:str
    interest:str
    status:str
