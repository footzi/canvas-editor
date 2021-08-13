import { UI } from "./intefaces";


const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');
const context = canvas?.getContext('2d');

if (context) {
    new UI(context);
}