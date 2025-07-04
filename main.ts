import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, WorkspaceLeaf } from 'obsidian';
import { EchoesView, VIEW_TYPE_ECHOES } from './src/EchoesView';
import { FrequencyAnalyzer } from './src/FrequencyAnalyzer';
import { WordCloudGenerator } from './src/WordCloudGenerator';

interface EchoesSettings {
	minWordLength: number;
	maxWords: number;
	excludeWords: string;
	includeTags: boolean;
	includeHeaders: boolean;
	refreshInterval: number;
}

const DEFAULT_SETTINGS: EchoesSettings = {
	minWordLength: 3,
	maxWords: 100,
	excludeWords: 'the,and,or,but,in,on,at,to,for,of,with,by,is,are,was,were,be,been,being,have,has,had,do,does,did,will,would,could,should,may,might,can,this,that,these,those,a,an,it,its,they,them,their,theirs,we,us,our,ours,you,your,yours,he,him,his,she,her,hers,i,me,my,mine,who,what,when,where,why,how,which,whom,whose,if,then,else,so,yet,nor,either,neither,both,all,any,some,many,much,few,little,more,most,less,least,very,quite,rather,too,also,just,only,even,still,already,again,once,twice,often,always,never,sometimes,usually,frequently,rarely,hardly,barely,almost,nearly,about,around,over,under,above,below,before,after,during,since,until,while,through,between,among,within,without,against,towards,upon,into,onto,across,along,down,up,out,off,away,back,here,there,everywhere,anywhere,somewhere,nowhere,whenever,now,today,tomorrow,yesterday,soon,late,early,first,last,next,previous,another,other,same,different,new,old,big,small,large,good,bad,best,worst,better,worse,right,wrong,true,false,yes,no,ok,okay,please,thank,thanks,hello,hi,bye,goodbye,sorry,excuse,pardon,și,sau,dar,însă,pentru,cu,de,la,în,pe,prin,către,din,asupra,sub,după,înainte,timp,ce,când,unde,cum,cine,care,al,ale,ai,au,avea,am,are,aveam,aveai,avea,aveați,aveau,voi,va,vor,să,fie,fiind,fost,este,sunt,era,erau,fiu,fii,fim,fiți,ești,suntem,sunteți,eram,erai,erați,făcut,face,fac,faci,facem,faceți,făceam,făceai,făcea,făceați,făceau,vei,vom,veți,aș,ați,ar,nu,da,foarte,mult,puțin,mai,cel,cea,cei,cele,un,una,unor,unei,aceasta,acesta,acestea,aceștia,această,acest,aceste,acești,acea,acel,acele,acei,care,ce,ca,cum,tot,toată,toți,toate,oricare,orice,cineva,ceva,nimeni,nimic,mereu,niciodată,uneori,adesea,rar,întotdeauna,iar,încă,deja,acum,atunci,apoi,ieri,azi,mâine,aici,acolo,oriunde,undeva,nicăieri,așa,astfel,altfel,poate,probabil,sigur,desigur,evident,bineînțeles,normal,natural,până,peste,dintre,printre,împotriva,datorită,conform,referitor,legat,privind,având,fiind,făcând,spunând,zicând,văzând,știind,putând,trebuind,vrând,dorind,între,printre,câteva,câțiva,fiecare,multe,puține,câte,câți,câtă,într,dintr,înspre,înaintea,în,urma,deasupra,dedesubt,înăuntru,afară',
	includeTags: true,
	includeHeaders: true,
	refreshInterval: 5000
}

export default class EchoesPlugin extends Plugin {
	settings: EchoesSettings;
	private analyzer: FrequencyAnalyzer;
	private wordCloudGenerator: WordCloudGenerator;

	async onload() {
		await this.loadSettings();
		
		this.analyzer = new FrequencyAnalyzer(this.settings);
		this.wordCloudGenerator = new WordCloudGenerator();

		// Register the view
		this.registerView(
			VIEW_TYPE_ECHOES,
			(leaf) => new EchoesView(leaf, this)
		);

		// Add ribbon icon
		const ribbonIconEl = this.addRibbonIcon('bar-chart-2', 'Echoes: Concept Frequency Analyzer', (evt: MouseEvent) => {
			this.activateView();
		});
		ribbonIconEl.addClass('echoes-ribbon-class');

		// Add command
		this.addCommand({
			id: 'open-echoes-view',
			name: 'Open Echoes Analyzer',
			callback: () => {
				this.activateView();
			}
		});

		// Add command to analyze current file
		this.addCommand({
			id: 'analyze-current-file',
			name: 'Analyze Current File',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.analyzeCurrentFile(view.file);
			}
		});

		// Add settings tab
		this.addSettingTab(new EchoesSettingTab(this.app, this));

		// Auto-refresh on file changes
		this.registerEvent(
			this.app.workspace.on('file-open', () => {
				this.refreshAnalysis();
			})
		);

		this.registerEvent(
			this.app.vault.on('modify', () => {
				this.refreshAnalysis();
			})
		);
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_ECHOES);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		if (this.analyzer) {
			this.analyzer.updateSettings(this.settings);
		}
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_ECHOES);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({ type: VIEW_TYPE_ECHOES, active: true });
		}

		workspace.revealLeaf(leaf);
	}

	async analyzeCurrentFile(file: TFile | null) {
		if (!file) {
			new Notice('No file selected');
			return;
		}

		try {
			const content = await this.app.vault.read(file);
			const analysis = this.analyzer.analyzeText(content, file.basename);
			
			// Show results in a modal or update the view
			const view = this.app.workspace.getLeavesOfType(VIEW_TYPE_ECHOES)[0]?.view as EchoesView;
			if (view) {
				view.updateAnalysis([analysis]);
			} else {
				new Notice(`Found ${analysis.totalWords} words, ${analysis.uniqueWords} unique`);
			}
		} catch (error) {
			new Notice('Error analyzing file: ' + error.message);
		}
	}

	private refreshTimeout: NodeJS.Timeout | null = null;

	private refreshAnalysis() {
		if (this.refreshTimeout) {
			clearTimeout(this.refreshTimeout);
		}

		this.refreshTimeout = setTimeout(async () => {
			const view = this.app.workspace.getLeavesOfType(VIEW_TYPE_ECHOES)[0]?.view as EchoesView;
			if (view) {
				await view.refreshAnalysis();
			}
		}, this.settings.refreshInterval);
	}

	getAnalyzer(): FrequencyAnalyzer {
		return this.analyzer;
	}

	getWordCloudGenerator(): WordCloudGenerator {
		return this.wordCloudGenerator;
	}
}

class EchoesSettingTab extends PluginSettingTab {
	plugin: EchoesPlugin;

	constructor(app: App, plugin: EchoesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Minimum word length')
			.setDesc('Minimum number of characters for words to be included in analysis')
			.addText(text => text
				.setPlaceholder('3')
				.setValue(this.plugin.settings.minWordLength.toString())
				.onChange(async (value) => {
					const num = parseInt(value);
					if (!isNaN(num) && num > 0) {
						this.plugin.settings.minWordLength = num;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Maximum words to display')
			.setDesc('Maximum number of words to show in visualizations')
			.addText(text => text
				.setPlaceholder('100')
				.setValue(this.plugin.settings.maxWords.toString())
				.onChange(async (value) => {
					const num = parseInt(value);
					if (!isNaN(num) && num > 0) {
						this.plugin.settings.maxWords = num;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Exclude words')
			.setDesc('Comma-separated list of words to exclude from analysis')
			.addTextArea(text => text
				.setPlaceholder('the,and,or,but...')
				.setValue(this.plugin.settings.excludeWords)
				.onChange(async (value) => {
					this.plugin.settings.excludeWords = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Include tags')
			.setDesc('Include hashtags in the frequency analysis')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.includeTags)
				.onChange(async (value) => {
					this.plugin.settings.includeTags = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Include headers')
			.setDesc('Include markdown headers in the frequency analysis')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.includeHeaders)
				.onChange(async (value) => {
					this.plugin.settings.includeHeaders = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Auto-refresh interval')
			.setDesc('How often to refresh analysis (in milliseconds)')
			.addText(text => text
				.setPlaceholder('5000')
				.setValue(this.plugin.settings.refreshInterval.toString())
				.onChange(async (value) => {
					const num = parseInt(value);
					if (!isNaN(num) && num >= 1000) {
						this.plugin.settings.refreshInterval = num;
						await this.plugin.saveSettings();
					}
				}));
	}
} 