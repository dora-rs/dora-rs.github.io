#!/bin/bash

DOXYFILE="Doxyfile"
OUTPUT_DIR="cpp"
FILES_TO_BACKUP=("cpp/cpp-api.html") # Adjust paths and filenames

backup_files() {
    echo "Backing up files..."
    for FILE in "${FILES_TO_BACKUP[@]}"; do
        BACKUP_FILE="${FILE}_backup"
        if [ -f "$FILE" ]; then
            cp "$FILE" "$BACKUP_FILE"
            echo "Backed up $FILE to $BACKUP_FILE"
        else
            echo "Warning: $FILE does not exist and will not be backed up"
        fi
    done
}

restore_files() {
    echo "Restoring files..."
    for FILE in "${FILES_TO_BACKUP[@]}"; do
        BACKUP_FILE="${FILE}_backup"
        if [ -f "$BACKUP_FILE" ]; then
            cp "$BACKUP_FILE" "$FILE"
            echo "Restored $FILE from $BACKUP_FILE"
        else
            echo "Warning: $BACKUP_FILE does not exist and cannot be restored"
        fi
    done
}

if [ ! -f "$DOXYFILE" ]; then
    echo "Error: Configuration file $DOXYFILE not found!"
    exit 1
fi

backup_files

# Run Doxygen to generate documentation
echo "Running Doxygen..."
doxygen $DOXYFILE

restore_files

echo "Done!"
