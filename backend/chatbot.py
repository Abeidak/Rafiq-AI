from typing import List, Dict
from knowledge_base import KnowledgeBase
from hassaniya import translate_hassaniya, detect_hassaniya

class Chatbot:
    def __init__(self):
        self.kb = KnowledgeBase()

    def update_knowledge(self, text: str):
        return self.kb.add_knowledge(text)

    def get_answer(self, question: str) -> Dict:
        # 1. Detect and translate Hassaniya
        original_question = question
        is_hassaniya = detect_hassaniya(question)
        if is_hassaniya:
            question = translate_hassaniya(question)

        # 2. Search Knowledge Base
        chunks = self.kb.search(question)

        # 3. Generate Answer (Rule-based / Placeholder for LLM)
        if not chunks:
            return {
                "answer": "Je ne trouve pas cette information dans ma base de connaissances. Veuillez contacter les organisateurs.",
                "used_chunks": [],
                "language": "hassaniya" if is_hassaniya else "fr"
            }

        # For now, we return the most relevant chunk as the answer
        # In a real scenario, we would pass 'chunks' and 'question' to an LLM
        best_chunk = chunks[0]["content"]
        answer = f"{best_chunk}"

        return {
            "answer": answer,
            "used_chunks": chunks,
            "language": "hassaniya" if is_hassaniya else "fr"
        }
