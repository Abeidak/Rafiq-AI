
# Dictionary of common Hassaniya words/expressions mapped to French
HASSANIYA_DICT = {
    "salam": "bonjour",
    "choukrane": "merci",
    "ach hadchi": "qu'est-ce que c'est",
    "mata": "quand",
    "yabda": "commence",
    "l7adath": "l'événement",
    "le défi": "le défi",
    "kifach": "comment",
    "win": "où",
    "mouchkil": "problème",
    "bghit": "je veux",
    "na3raf": "savoir",
    "wa9t": "heure",
    "date": "date",
    "fin": "où",
    "chkoune": "qui",
    "organisateur": "organisateur",
    "tasjil": "inscription",
    "nuit de l'info": "nuit de l'info"
}

def translate_hassaniya(text: str) -> str:
    """
    Replaces known Hassaniya words in the text with their French equivalents.
    This is a simple word-for-word substitution.
    """
    words = text.lower().split()
    translated_words = [HASSANIYA_DICT.get(word, word) for word in words]
    return " ".join(translated_words)

def detect_hassaniya(text: str) -> bool:
    """
    Returns True if the text contains known Hassaniya words.
    """
    words = text.lower().split()
    for word in words:
        if word in HASSANIYA_DICT:
            return True
    return False
