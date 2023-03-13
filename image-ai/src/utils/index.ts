import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

export function getRandomPrompts(prompt: string): any {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompt) return getRandomPrompts(prompt);

	return randomPrompt;
}

export async function downloadImage(_id: number, photo: any) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
