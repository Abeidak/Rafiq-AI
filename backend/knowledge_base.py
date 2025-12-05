import re
import json
import os
from typing import List, Dict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

DB_FILE = "knowledge.json"

class KnowledgeBase:
    def __init__(self):
        self.chunks: List[Dict] = []
        self.vectorizer = TfidfVectorizer()
        self.tfidf_matrix = None
        self.is_fitted = False
        self.load_from_disk()

    def add_knowledge(self, text: str, source: str = "user_upload"):
        """
        Splits text into chunks and rebuilds the index.
        """
        # Simple splitting by double newlines or periods followed by space
        raw_chunks = re.split(r'\n\n|\.\s+', text)
        
        new_chunks = []
        # Start ID from existing count
        start_id = len(self.chunks)
        
        for i, content in enumerate(raw_chunks):
            content = content.strip()
            if len(content) > 20:  # Ignore very short chunks
                new_chunks.append({
                    "id": start_id + i,
                    "content": content,
                    "source": source
                })
        
        self.chunks.extend(new_chunks)
        self._rebuild_index()
        self.save_to_disk()
            
        return len(new_chunks)

    def _rebuild_index(self):
        if self.chunks:
            corpus = [chunk["content"] for chunk in self.chunks]
            self.tfidf_matrix = self.vectorizer.fit_transform(corpus)
            self.is_fitted = True

    def save_to_disk(self):
        try:
            with open(DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.chunks, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Error saving knowledge base: {e}")

    def load_from_disk(self):
        if os.path.exists(DB_FILE):
            try:
                with open(DB_FILE, 'r', encoding='utf-8') as f:
                    self.chunks = json.load(f)
                self._rebuild_index()
                print(f"Loaded {len(self.chunks)} chunks from disk.")
            except Exception as e:
                print(f"Error loading knowledge base: {e}")
                self.chunks = []


    def search(self, query: str, k: int = 3) -> List[Dict]:
        """
        Finds the top-k most relevant chunks for the query.
        """
        if not self.is_fitted or not self.chunks:
            return []

        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        # Get top-k indices
        top_k_indices = similarities.argsort()[-k:][::-1]
        
        results = []
        for idx in top_k_indices:
            if similarities[idx] > 0.1:  # Threshold to avoid irrelevant results
                results.append(self.chunks[idx])
                
        return results

    def clear(self):
        self.chunks = []
        self.tfidf_matrix = None
        self.is_fitted = False
