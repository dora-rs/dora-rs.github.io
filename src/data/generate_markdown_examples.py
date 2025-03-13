import numpy as np
import pandas as pd

# File paths
input_json_file = "examples.json"  # Path to the input JSON file
output_markdown_file = "output_table_examples.md"  # Path to save the markdown table

# Predefined category order
categories_order = [
    "Audio",
    "Vision",
    "Model Training",
    "ROS2",
    "Benchmark",
    "Tutorial",
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

df["last_commit"] = df["last_commit"].apply(
    lambda x: f"![License]({x}&label=%20)" if x else ""
)


# Function to generate a markdown table for a single category
def generate_category_table(category, group):
    table = (
        "| Type | Title | Description | Last Commit |\n"
        "|------|-------|-------------|-------------|\n"
    )
    for _, row in group.iterrows():
        table += f"| {row['category']} | {row['title']} | {row['description']} | {row['last_commit']} |\n"
    return table + "\n"


# Generate markdown tables for each category
markdown_tables = []
markdown_tables.append(generate_category_table("", df))

# Combine all tables into a single markdown file
markdown_content = "\n".join(markdown_tables)

# Save the markdown content to a file
with open(output_markdown_file, "w") as file:
    file.write(markdown_content)
