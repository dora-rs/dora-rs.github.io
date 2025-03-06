import numpy as np
import pandas as pd

# File paths
input_json_file = "nodes.json"  # Path to the input JSON file
output_markdown_file = "output_table.md"  # Path to save the markdown table

# Predefined category order
categories_order = [
    "Camera",
    "Peripheral",
    "Actuator",
    "Chassis",
    "Arm",
    "Robot",
    "Voice Activity Detection",
    "Speech to Text",
    "Vision Language Model",
    "Large Language Model",
    "Vision Language Action",
    "Object Detection",
    "Segmentation",
    "Translation",
    "Text to Speech",
    "Recorder",
    "Visualization",
    "Simulator",
]

# Read JSON data into a DataFrame using pandas
df = pd.read_json(input_json_file)

# Map categories to the predefined order
df["category"] = pd.Categorical(
    df["category"], categories=categories_order, ordered=True
)

# Sort the DataFrame by the 'category' column
df = df.sort_values("category")

# Replace NaN values with empty strings
df = df.replace({np.nan: ""})

# Create the 'title' column as a markdown link to the 'source'
df["title"] = df.apply(
    lambda row: f"[{row['title']}]({row['source']})" if row["source"] else row["title"],
    axis=1,
)

# Combine shields into one column with markdown image syntax
df["shields"] = df.apply(
    lambda row: (f"![Downloads]({row['downloads']}) " if row["downloads"] else "")
    + (f"![License]({row['license']}) " if row["license"] else "")
    + (f"![Release]({row['last_release']})" if row["last_release"] else ""),
    axis=1,
)


# Function to generate a markdown table for a single category
def generate_category_table(category, group):
    table = (
        f"### {category}\n\n"
        "| Title | Description | Shields |\n"
        "|-------|-------------|---------|\n"
    )
    for _, row in group.iterrows():
        table += f"| {row['title']} | {row['description']} | {row['shields']} |\n"
    return table + "\n"


# Generate markdown tables for each category
markdown_tables = []
for category, group in df.groupby("category", sort=False):
    markdown_tables.append(generate_category_table(category, group))

# Combine all tables into a single markdown file
markdown_content = "\n".join(markdown_tables)

# Save the markdown content to a file
with open(output_markdown_file, "w") as file:
    file.write(markdown_content)
