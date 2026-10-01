def to_camel_case(text):
    import re
    s = str(text or "")
    if not re.search(r"[^A-Za-z0-9]", s):
        return s[0].lower() + s[1:] if s else s
    words = [w for w in re.split(r"[^A-Za-z0-9]+", s) if w]
    return words[0].lower() + "".join(w[0].upper() + w[1:].lower() for w in words[1:])

def to_snake_case(text):
    import re
    s = str(text or "")
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", s)
    return re.sub(r"[\s\-]+", "_", s).lower()
