---
authors: haixuan
title: Reachy2 Pick and Place
description: Using reachy2 with QwenVL2.5 to pick object and put it in a brown bag.
---

##### Using qwenVL 2.5 multi bounding box capabilities to pick and place mulitple item with very low latency.

## Rerun

<iframe src="https://app.rerun.io/version/0.21.0/index.html?url=https://huggingface.co/datasets/haixuantao/rerun_dataset/resolve/main/final_chocolate_in_hand.rrd" width="100%" height="700px"></iframe>

> In case Rerun does not work on your phone. You'll find the video below:
> <video controls src="https://huggingface.co/datasets/haixuantao/rerun_dataset/resolve/main/2025-02-25%2020-19-46.mp4#t=10" width="100%"  ></video>
> In the above iframe, the important information are:

- `/text_whisper`: correspond to **whisper** audio transcription.
- `/text_response`: correspond to the bounding box given as plain text from **QwenVL 2.5**
- `camera_torso`: correspond to **Orbecc Gemini 336 Depth Camera** rgb image.
- `camera_torso` bounding box: correspond to the QwenVL bounding box projected on the image that is going to be used to grasp object. The prediction is done at regular interval and does not disappear. Sorry if it can be a bit confusing.

## Code

The branch: https://github.com/dora-rs/dora/pull/793

## Demo

<video controls src="https://huggingface.co/datasets/haixuantao/rerun_dataset/resolve/main/temp_video_1740509513726.mp4" width="100%"  ></video>
