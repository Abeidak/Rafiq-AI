from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from chatbot import Chatbot

app = FastAPI(title="Rafiq-AI API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot = Chatbot()

class KnowledgeRequest(BaseModel):
    text: str
    source: str = "user"

class ChatRequest(BaseModel):
    message: str
    language: str = "auto"

@app.post("/api/knowledge")
async def update_knowledge(request: KnowledgeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    count = bot.update_knowledge(request.text)
    return {"status": "ok", "chunk_count": count, "message": "Knowledge base updated successfully."}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not request.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    response = bot.get_answer(request.message)
    return response

@app.get("/")
async def root():
    return {"message": "Rafiq-AI API is running"}
