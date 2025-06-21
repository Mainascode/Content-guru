# run_seed.py
# run_seed.py
import sys
import os

# Add the 'backend' folder to the path so that Python can find 'server'
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from server.seed import main

if __name__ == "__main__":
    main()
