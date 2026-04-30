import json
import subprocess
import sys


def log(msg):
    print(msg, file=sys.stderr)


def main():
    try:
        # Read event data from stdin
        input_data = sys.stdin.read()
        if not input_data:
            print("{}")
            return

        data = json.loads(input_data)
        tool = data.get("tool")
        args = data.get("arguments", {})
        file_path = args.get("file_path")

        if file_path and file_path.endswith(".py"):
            log(f"Running ruff fix on {file_path}...")
            # Use uv run if uv is available, else fallback to direct ruff
            cmd = ["uv", "run", "ruff", "check", "--fix", file_path]
            try:
                subprocess.run(cmd, check=False, capture_output=True, text=True)
                log(f"Ruff fix completed for {file_path}")
            except FileNotFoundError:
                # Fallback if uv is not in PATH or something
                subprocess.run(["ruff", "check", "--fix", file_path], check=False, capture_output=True, text=True)

        # Must output valid JSON to stdout
        print("{}")
    except Exception as e:
        log(f"Error in ruff-fix hook: {e}")
        print("{}")


if __name__ == "__main__":
    main()
