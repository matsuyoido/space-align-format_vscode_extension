// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const spaceRegex: RegExp = /[\s|\t]+/;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"space-align-format" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('matsuyoido.vscode.format.space_align', () => {
			const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
			if (editor) {
				const document: vscode.TextDocument = editor.document;
				const selection: vscode.Selection = editor.selection;

				// key: lineNumber | value: textPosition
				const textLineInfo: Map<number, vscode.Range> = new Map();
				const maxColumnLengthList: number[]= [];

				let minLine: number = 0;
				let maxLine: number = document.lineCount - 1;
				if (!selection.isEmpty) {
					let selectStartLine = selection.start.line;
					let selectEndLine = selection.end.line;
					if (selectStartLine == selectEndLine) {
						console.info("space alignable multiple line, skip execute.");
						return;
					}
					minLine = selectStartLine < selectEndLine ? selectStartLine : selectEndLine;
					maxLine = selectStartLine < selectEndLine ? selectEndLine : selectStartLine;
				}

				for (let i = minLine; i <= maxLine; i++) {
					const textLine: vscode.TextLine = document.lineAt(i);
					if (textLine.isEmptyOrWhitespace) {
						continue;
					}
					const columnTexts = textLine.text.split(spaceRegex);
					textLineInfo.set(i, textLine.range);
					for (let j = 0; j < columnTexts.length; j++) {
						if (maxColumnLengthList.length <= j) {
							maxColumnLengthList.push(columnTexts[j].length);
						} else {
							let currentLength = maxColumnLengthList[j];
							let newLength = columnTexts[j].length;
							if (currentLength < newLength) {
								maxColumnLengthList[j] = newLength;
							}
						}
					}
				}

				editor.edit(editBuilder => {
					Array.from(textLineInfo.keys()).sort().reverse().forEach(lineNumber => {
						const textPosition: vscode.Range | undefined = textLineInfo.get(lineNumber);
						if (textPosition) {
							let text = document.getText(textPosition);
							let replaceText = text.split(spaceRegex).map((columnText: string, i: number) => {
								let arrangedText: string = columnText;
								let targetLength: number = maxColumnLengthList[i];
								for (let j = 0; j < targetLength - columnText.length; j++) {
									arrangedText+=" ";
								}
								return arrangedText;
							}).reduce((previousText, currentText) => `${previousText} ${currentText}`);
							console.debug(`replaced [${textPosition.start.line}]: [${text}] to [${replaceText}]`);
							if (text !== replaceText) {
								editBuilder.replace(textPosition, replaceText.trimEnd());
							}
						}
					});
				});
			}
		})
		,
		vscode.commands.registerCommand('matsuyoido.vscode.format.space_align_group', () => {
			const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
			if (editor) {
				interface LineTextInfo {
					textPosition: vscode.Range;
					columnCount: number;
				}
				const document: vscode.TextDocument = editor.document;

				// key: lineNumber | value: LineTextInfo
				const textLineInfo: Map<number, LineTextInfo> = new Map();
				// key: columnCount | value: maxColumnLengthList
				const columnGroup: Map<number, number[]> = new Map();
				const fileAllLine: number = document.lineCount;
				for (let i = 0; i < fileAllLine; i++) {
					const textLine: vscode.TextLine = document.lineAt(i);
					if (textLine.isEmptyOrWhitespace) {
						continue;
					}
					const columnTexts = textLine.text.trim().split(spaceRegex);
					textLineInfo.set(i, {
						textPosition: textLine.range,
						columnCount: columnTexts.length,
					});
					const columnCount: number = columnTexts.length;
					let maxColumnLengthList: number[] | undefined = columnGroup.get(columnCount);
					if (!maxColumnLengthList) {
						maxColumnLengthList = columnTexts.map(text => text.length);
					} else {
						for (let j = 0; j < columnCount; j++) {
							let currentLength = maxColumnLengthList[j];
							let newLength = columnTexts[j].length;
							if (currentLength < newLength) {
								maxColumnLengthList[j] = newLength;
							}
						}
					}
					columnGroup.set(columnCount, maxColumnLengthList);
				}

				const replaceValues: Map<vscode.Range, string> = new Map();
				Array.from(textLineInfo.keys()).sort().reverse().forEach(lineNumber => {
					const textInfo: LineTextInfo | undefined = textLineInfo.get(lineNumber);
					if (textInfo) {
						const columnsLength: number[] | undefined = columnGroup.get(textInfo.columnCount);
						if (columnsLength) {
							let text = document.getText(textInfo.textPosition);
							let replaceText = text.split(spaceRegex).reduce((previousValue, columnText, index) => {
								let arrangedText: string = previousValue;
								if (index == 1) {
									for (let i = 0; i < columnsLength[0] - previousValue.length; i++) {
										arrangedText+=" ";
									}
								}
								let arrangeText: string = columnText;
								for (let i = 0; i < columnsLength[index] - columnText.length; i++) {
									arrangeText+=" ";
								}
								return `${arrangedText} ${arrangeText}`;
							});
							console.debug(`replaced [${textInfo.textPosition.start.line}]: [${text}] to [${replaceText}]`);
							if (text !== replaceText) {
								replaceValues.set(textInfo.textPosition, replaceText.trimEnd());
							}
						}
					}
				});
				if (0 < replaceValues.size) {
					editor.edit(editBuilder => {
						replaceValues.forEach((text, range) => editBuilder.replace(range, text));
					});
				} else {
					console.info("already align formatted.")
				}
			}
		})
		,
		vscode.commands.registerCommand('matsuyoido.vscode.format.space_align_center_both', async () => {
			const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
			if (editor) {
				const centerSplitCharacter: string | undefined = await vscode.window.showInputBox({
					title: 'Input center character'
				});
				if (!centerSplitCharacter || centerSplitCharacter.trim().length == 0) {
					console.info('center character input required.');
					return;
				}
				let firstCharacter: string | undefined = await vscode.window.showInputBox({
					title: '(Opt)Input word inserted at the beginning of the line.'
				});
				if (!firstCharacter) {
					firstCharacter = "";
				}
				interface ReplaceTextInfo {
					leftTexts: string[];
					rightTexts: string[];
				}
				const document: vscode.TextDocument = editor.document;
				const selection: vscode.Selection = editor.selection;

				let minLine: number = 0;
				let maxLine: number = document.lineCount - 1;
				if (!selection.isEmpty) {
					let selectStartLine = selection.start.line;
					let selectEndLine = selection.end.line;
					if (selectStartLine == selectEndLine) {
						console.info("space alignable multiple line, skip execute.");
						return;
					}
					minLine = selectStartLine < selectEndLine ? selectStartLine : selectEndLine;
					maxLine = selectStartLine < selectEndLine ? selectEndLine : selectStartLine;
				}
				const replaceValues: Map<vscode.Range, ReplaceTextInfo> = new Map();
				let leftTextColumnMaxLength: number[] = [];
				let rightTextColumnMaxLength: number[] = [];
				for (let i = minLine; i <= maxLine; i++) {
					const textLine: vscode.TextLine = document.lineAt(i);
					if (textLine.isEmptyOrWhitespace) {
						continue;
					}
					const splitText = textLine.text.split(centerSplitCharacter);
					if (splitText.length <= 1) {
						console.debug(`skip line: [${i+1}]`);
						continue;
					} else if (2 < splitText.length) {
						vscode.window.showErrorMessage(`${centerSplitCharacter} is multiple. Line: [${i+1}]`);
						return;
					}
					let leftText = splitText[0].trim();
					let rightText = splitText[1].trim();

					const leftColumnTexts = leftText.split(spaceRegex);
					for (let j = leftColumnTexts.length - 1, k = 0; 0 <= j; j--, k++) {
						let newLength = leftColumnTexts[j].length;
						if (leftTextColumnMaxLength.length <= k) {
							leftTextColumnMaxLength.push(newLength);
						} else {
							let currentLength = leftTextColumnMaxLength[k];
							if (currentLength < newLength) {
								leftTextColumnMaxLength[k] = newLength;
							}
						}
					}

					const rightColumnTexts = rightText.split(spaceRegex);
					for (let j = 0; j < rightColumnTexts.length; j++) {
						if (rightTextColumnMaxLength.length <= j) {
							rightTextColumnMaxLength.push(rightColumnTexts[j].length);
						} else {
							let currentLength = rightTextColumnMaxLength[j];
							let newLength = rightColumnTexts[j].length;
							if (currentLength < newLength) {
								rightTextColumnMaxLength[j] = newLength;
							}
						}
					}

					replaceValues.set(textLine.range, {
						leftTexts: leftColumnTexts,
						rightTexts: rightColumnTexts,
					});
				}

				editor.edit(editBuilder => {
					Array.from(replaceValues.keys()).sort((a, b) => a.start.line - b.start.line).reverse().forEach((position: vscode.Range) => {
						const replacInfo: ReplaceTextInfo | undefined = replaceValues.get(position);
						if (replacInfo) {
							let replaceLeftText: string = replacInfo.leftTexts.reverse().map((text, index) => {
								let arrangedText = text;
								let repeatCount = leftTextColumnMaxLength[index] - arrangedText.length;
								for (let i = 0; i < repeatCount; i++) {
									arrangedText+=" ";
								}
								return arrangedText;
							}).reverse().reduce((previousValueText, columnText) => `${previousValueText} ${columnText}`);
							if (replacInfo.leftTexts.length < leftTextColumnMaxLength.length) {
								let adjustSpace: string = "";
								for(let i = replacInfo.leftTexts.length; i < leftTextColumnMaxLength.length; i++) {
									for (let j = 0; j < leftTextColumnMaxLength[i]; j++) {
										adjustSpace+=" ";
									}
									if (i+1 < leftTextColumnMaxLength.length) {
										// not last columns, add space
										adjustSpace+=" ";
									}
								}
								if (adjustSpace != "") {
									replaceLeftText = `${adjustSpace} ${replaceLeftText}`;
								}
							}
							let replaceRightText: string = replacInfo.rightTexts.map((text, index) => {
								let arrangedText = text;
								let repeatCount = rightTextColumnMaxLength[index] - arrangedText.length;
								for (let i = 0; i < repeatCount; i++) {
									arrangedText+=" ";
								}
								return arrangedText;
							}).reduce((previousValueText, columnText) => `${previousValueText} ${columnText}`);

							editBuilder.replace(position, `${firstCharacter}${replaceLeftText} ${centerSplitCharacter} ${replaceRightText.trim()}`);
						}
					});
				});

			}

		})
		,
		vscode.commands.registerCommand('matsuyoido.vscode.format.space_align_center_left', async () => {
			const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
			if (editor) {
				const centerSplitCharacter: string | undefined = await vscode.window.showInputBox({
					title: 'Input center character'
				});
				if (!centerSplitCharacter || centerSplitCharacter.trim().length == 0) {
					console.info('center character input required.');
					return;
				}
				let firstCharacter: string | undefined = await vscode.window.showInputBox({
					title: '(Opt)Input word inserted at the beginning of the line.'
				});
				if (!firstCharacter) {
					firstCharacter = "";
				}
				interface ReplaceTextInfo {
					leftTexts: string[];
					rightText: string;
				}
				const document: vscode.TextDocument = editor.document;
				const selection: vscode.Selection = editor.selection;

				let minLine: number = 0;
				let maxLine: number = document.lineCount - 1;
				if (!selection.isEmpty) {
					let selectStartLine = selection.start.line;
					let selectEndLine = selection.end.line;
					if (selectStartLine == selectEndLine) {
						console.info("space alignable multiple line, skip execute.");
						return;
					}
					minLine = selectStartLine < selectEndLine ? selectStartLine : selectEndLine;
					maxLine = selectStartLine < selectEndLine ? selectEndLine : selectStartLine;
				}
				const replaceValues: Map<vscode.Range, ReplaceTextInfo> = new Map();
				let leftTextColumnMaxLength: number[] = [];
				for (let i = minLine; i <= maxLine; i++) {
					const textLine: vscode.TextLine = document.lineAt(i);
					if (textLine.isEmptyOrWhitespace) {
						continue;
					}
					const splitText = textLine.text.split(centerSplitCharacter);
					if (splitText.length <= 1) {
						console.debug(`skip line: [${i+1}]`);
						continue;
					} else if (2 < splitText.length) {
						vscode.window.showErrorMessage(`${centerSplitCharacter} is multiple. Line: [${i+1}]`);
						return;
					}
					let leftText = splitText[0].trim();

					const leftColumnTexts = leftText.split(spaceRegex);
					for (let j = leftColumnTexts.length - 1, k = 0; 0 <= j; j--, k++) {
						let newLength = leftColumnTexts[j].length;
						if (leftTextColumnMaxLength.length <= k) {
							leftTextColumnMaxLength.push(newLength);
						} else {
							let currentLength = leftTextColumnMaxLength[k];
							if (currentLength < newLength) {
								leftTextColumnMaxLength[k] = newLength;
							}
						}
					}

					replaceValues.set(textLine.range, {
						leftTexts: leftColumnTexts,
						rightText: splitText[1],
					});
				}

				editor.edit(editBuilder => {
					Array.from(replaceValues.keys()).sort((a, b) => a.start.line - b.start.line).reverse().forEach((position: vscode.Range) => {
						const replacInfo: ReplaceTextInfo | undefined = replaceValues.get(position);
						if (replacInfo) {
							let replaceLeftText: string = replacInfo.leftTexts.reverse().map((text, index) => {
								let arrangedText = text;
								let repeatCount = leftTextColumnMaxLength[index] - arrangedText.length;
								for (let i = 0; i < repeatCount; i++) {
									arrangedText+=" ";
								}
								return arrangedText;
							}).reverse().reduce((previousValueText, columnText) => `${previousValueText} ${columnText}`);
							if (replacInfo.leftTexts.length < leftTextColumnMaxLength.length) {
								let adjustSpace: string = "";
								for(let i = replacInfo.leftTexts.length; i < leftTextColumnMaxLength.length; i++) {
									for (let j = 0; j < leftTextColumnMaxLength[i]; j++) {
										adjustSpace+=" ";
									}
									if (i+1 < leftTextColumnMaxLength.length) {
										// not last columns, add space
										adjustSpace+=" ";
									}
								}
								if (adjustSpace != "") {
									replaceLeftText = `${adjustSpace} ${replaceLeftText}`;
								}
							}
							let replaceRightText: string = replacInfo.rightText;

							editBuilder.replace(position, `${firstCharacter}${replaceLeftText} ${centerSplitCharacter}${replaceRightText}`);
						}
					});
				});

			}

		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
