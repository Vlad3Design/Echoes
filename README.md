![Echoes](Echoes.jpg)

# Echoes - Discover What Your Notes Are Really About

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-purple)](https://obsidian.md/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**See the hidden patterns in your notes!** Echoes scans your entire vault to reveal dominant concepts through word clouds and comprehensive statistics, instantly showing you what matters most in your knowledge collection.

## ✨ What is Echoes?

Imagine you have hundreds of notes scattered across your digital notebook, and you want to know: **"What are my main topics? What do I write about most?"**

Echoes is like having a smart assistant that reads through all your notes and tells you exactly that! It scans every single note in your Obsidian vault and creates beautiful visual summaries showing which words, concepts, and topics appear most frequently.

### **Why is this useful?**

- 📝 **For Writers & Researchers**: See which themes dominate your work
- 🎓 **For Students**: Identify your most studied subjects  
- 💼 **For Professionals**: Understand what you focus on most
- 🧠 **For Anyone**: Get insights into your thinking patterns

## ✨ What Makes Echoes Special?

### 🎯 **Perfect for Anyone Who Writes Notes**
Whether you're a student, researcher, writer, or just someone who loves taking notes - Echoes helps you understand what you're really writing about. It's like having a smart assistant that reads through all your notes and tells you exactly what topics dominate your thinking.

### 🌟 **5 Beautiful Ways to View Your Data**

**📊 Overview Dashboard**
- Quick stats showing your most important numbers
- Top 10 words at a glance
- Quick actions for analyzing current files

**☁️ Word Cloud Visualization**
- Beautiful, interactive word clouds
- Words are sized by frequency - bigger = more important!
- Hover over any word to see exact counts and percentages

**📈 Frequency Charts**
- Clear bar charts showing your top words
- Exact counts and percentages for each word
- Easy to spot patterns and trends

**🏷️ Tag Analysis**
- Special section just for your hashtags (#like #this)
- See which tags you use most often
- Understand how you organize your thoughts

**📋 Detailed Reports**
- Complete data tables with all your words
- Exportable information for further analysis
- Comprehensive statistics about your vault

![Echoes](1_echoes.jpg)
![Echoes](2_echoes.jpg)
![Echoes](3_echoes.jpg)
![Echoes](4_echoes.jpg)

## 🚀 Getting Started is Super Easy

### **Installation (Choose Your Method)**

**Option 1: Manual Installation (Recommended)**
1. Download the latest release from [GitHub](https://github.com/Vlad3Design/echoes)
2. Extract the files to your vault's plugins folder: `VaultFolder/.obsidian/plugins/echoes/`
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

**Option 2: Build from Source (For Developers)**
1. Clone this repository: `git clone https://github.com/Vlad3Design/echoes.git`
2. Install dependencies: `npm install`
3. Build the plugin: `npm run build`
4. Copy `main.js`, `manifest.json`, and `styles.css` to your vault's plugins folder

### **Using Echoes (3 Simple Steps)**

1. **Open Echoes**: Click the bar chart icon in the left ribbon or use the command palette (`Ctrl/Cmd + P`) and search for "Open Echoes Analyzer"

2. **Analyze Your Vault**: Click the "Refresh" button to analyze all markdown files in your vault

3. **Explore the Results**: Navigate through different tabs to discover your patterns:
   - **Overview**: See key statistics and top words
   - **Word Cloud**: Visual representation of word frequencies
   - **Frequency Chart**: Detailed bar charts
   - **Tags**: Analysis of your hashtags
   - **Details**: Comprehensive data tables

## 🎯 Smart Features That Make a Difference

### **🔍 Multi-Language Intelligence**
- **Perfect Romanian support** - words like "emoție" and "emoții" are processed correctly
- **Full English support** - works great with any English content
- **Smart filtering** - automatically removes common words like "the", "și", "pentru" so you see what really matters

### **⚡ Smart Text Processing**
- Analyzes all markdown files in your vault automatically
- Intelligently removes code blocks, formatting, and links
- Extracts and analyzes hashtags separately
- Processes headers and content with configurable inclusion
- Filters out common stop words in both Romanian and English

### **🎨 Beautiful Visualizations**
- Interactive word clouds with hover tooltips
- Responsive bar charts showing frequency distributions
- Tag clouds with size-based frequency representation
- Statistics dashboard with key metrics
- Works perfectly with both light and dark themes

### **⚙️ Easy Customization**
- Minimum word length filtering (skip short words like "a", "an")
- Maximum words to display in visualizations
- Custom exclude words list (add your own words to ignore)
- Toggle hashtag and header inclusion
- Auto-refresh interval settings

### **📤 Export Your Insights**
- Export analysis results as JSON files
- Save frequency data for external analysis
- Timestamped analysis snapshots
- Share results with others

## 🔧 Settings Made Simple

Access plugin settings through **Settings → Plugin Options → Echoes**:

### **Analysis Settings**
- **Minimum Word Length**: Set the minimum character count for words to include (default: 3)
- **Maximum Words**: Limit the number of words shown in visualizations (default: 100)
- **Exclude Words**: Comma-separated list of words to exclude from analysis
- **Include Tags**: Toggle hashtag analysis on/off
- **Include Headers**: Toggle markdown header analysis on/off
- **Auto-refresh Interval**: Set how often analysis refreshes (in milliseconds)

### **Default Smart Filters**
The plugin comes with comprehensive word lists that automatically filter out:
- **Common English words**: articles, pronouns, prepositions, conjunctions, auxiliary verbs
- **Romanian words**: cuvinte de legătură, prepoziții, pronume, verbe auxiliare, conjuncții
- **Extended vocabulary**: time expressions, common adjectives, greetings, and other non-essential words

This ensures that only meaningful content words appear in your analysis, making the results more relevant and insightful.

## 🎨 Perfect Design Integration

The plugin respects Obsidian's theme system and uses CSS variables for consistent styling. It automatically adapts to both light and dark themes, and looks great on any screen size.

## 🛠️ For Developers

The plugin exposes several classes that can be used by other plugins:

- `FrequencyAnalyzer`: Core text analysis functionality
- `WordCloudGenerator`: Visualization generation
- `EchoesView`: Main UI component

## 🐛 Troubleshooting Made Easy

### **Common Questions**

**"Analysis not updating"**
- Try clicking the Refresh button manually
- Check the auto-refresh interval setting

**"Empty results"**
- Make sure your vault contains markdown files with text content
- Check if your files have enough words to analyze

**"Performance seems slow"**
- Reduce the maximum words setting
- Increase the minimum word length filter
- Try analyzing fewer files at once

## 🚀 Development Setup

### **What You Need**
- Node.js (v16 or higher)
- npm or yarn
- TypeScript

### **Quick Setup**
```bash
# Clone the repository
git clone https://github.com/Vlad3Design/echoes.git
cd echoes

# Install dependencies
npm install

# Start development mode
npm run dev
```

### **Building for Production**
```bash
# Build for production
npm run build

# Type checking
npm run type-check
```

### **Project Structure**
```
echoes/
├── src/
│   ├── EchoesView.ts          # Main UI component
│   ├── FrequencyAnalyzer.ts   # Text analysis logic
│   └── WordCloudGenerator.ts  # Visualization components
├── main.ts                    # Plugin entry point
├── manifest.json              # Plugin metadata
├── package.json               # Dependencies and scripts
└── README.md                  # Documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### **Development Guidelines**
1. Follow TypeScript best practices
2. Maintain consistent code style
3. Add tests for new features
4. Update documentation as needed

## 👨‍💻 Meet the Creator

**Vlad 3Design**
- GitHub: [@Vlad3Design](https://github.com/Vlad3Design)
- Website: [vlad3d.art](https://vlad3d.art)
- X (Twitter): [@vlad3design](https://x.com/vlad3design)
- Instagram: [@vlad.3design](https://instagram.com/vlad.3design)

*Passionate 3D artist and coder, creating tools that enhance creativity and productivity.*

## 📚 Helpful Resources

- [Obsidian Plugin Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Plugin Repository](https://github.com/Vlad3Design/echoes)
- [Report Issues](https://github.com/Vlad3Design/echoes/issues)
- [View Changelog](CHANGELOG.md)

---

**Ready to discover what your notes are really about?** Install Echoes and unlock the hidden patterns in your digital brain! 🧠✨
