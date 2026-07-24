import json
import logging
from pathlib import Path
from typing import Any, Dict


def setup_logger(
    name: str = "api_framework",
    log_file: str = "logs/framework.log",
    level: str = "INFO",
) -> logging.Logger:
    """Create and configure a logger with file and console handlers."""
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, level.upper(), logging.INFO))

    # Avoid adding duplicate handlers
    if logger.handlers:
        return logger

    # File handler
    log_path = Path(log_file)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    file_handler = logging.FileHandler(log_path, mode="a")
    file_handler.setLevel(getattr(logging, level.upper(), logging.INFO))
    file_format = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    file_handler.setFormatter(file_format)
    logger.addHandler(file_handler)

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(getattr(logging, level.upper(), logging.INFO))
    console_format = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")
    console_handler.setFormatter(console_format)
    logger.addHandler(console_handler)

    return logger


def load_json_file(file_path: str) -> Dict[str, Any]:
    """Load and parse a JSON file, returning its contents as a dictionary."""
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"JSON fixture not found: {file_path}")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_json_list(file_path: str) -> list:
    """Load and parse a JSON file containing a list."""
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"JSON fixture not found: {file_path}")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
