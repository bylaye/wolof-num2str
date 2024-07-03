from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import lang_wolof as wl

app = FastAPI()

origins = [
        "*", 
        #"http://localhost:3000",
        ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Comment": "Wolof Translate Number"}


@app.get("/get/strnumber/{value}")
def wolof_number_to_str(value: str):
    try:
        value = int(value)
        dec = wl.decompose(int(value))
        str2money = wl.currency(value)
        str2cardinal = wl.cardinal(dec)
        str2cardinal2 = wl.cardinal_2(dec)
        return{ "value": value,
                "cardinal": str2cardinal,
                "cardinal2": str2cardinal2,
                "money":str2money 
            }
    except:
        return {"comment":"only accept int value"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8800)
