# CodeAnalyzer - AI-Powered Code Review & Debugging

A comprehensive, beginner-friendly web application that analyzes code in multiple programming languages, providing line-by-line explanations, code review findings, and safe JavaScript execution - all running entirely in your browser with complete privacy.

## 🌟 Features

### 🎯 **Automatic Language Detection**
- Intelligent detection of 7+ programming languages
- Confidence scoring with detailed reasoning
- Manual language override option
- Support for JavaScript, Python, Java, HTML, CSS, SQL, and Shell scripts

### 📖 **Line-by-Line Code Explanations**
- Plain English explanations for every line of code
- Programming concept definitions and examples
- Syntax highlighting and error detection
- Interactive expandable explanations

### 🔍 **Comprehensive Code Review**
- **Syntax Analysis**: Detects errors, missing semicolons, unmatched brackets
- **Logic Review**: Finds potential bugs, unreachable code, logic errors
- **Style Checking**: Enforces best practices and coding standards
- **Security Scanning**: Identifies vulnerabilities and security risks
- **Performance Analysis**: Suggests optimizations and efficiency improvements

### 🚀 **Safe JavaScript Execution**
- Sandboxed code execution environment
- Real-time console output capture
- Error handling with stack traces
- Timeout protection against infinite loops
- No access to sensitive browser APIs

### 📱 **Modern User Experience**
- Responsive design for all devices
- Dark/light theme toggle
- Keyboard shortcuts for power users
- Offline functionality (PWA)
- Export analysis reports as HTML

### 🔒 **Privacy-First Design**
- **100% client-side processing** - your code never leaves your device
- No external API calls or data transmission
- No tracking or analytics
- Works completely offline after first load

## 🚀 Getting Started

### Online Usage
Visit the live application at: [Your deployment URL]

### Local Development

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd codeanalyzer
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 📖 How to Use

### Basic Usage
1. **Paste your code** into the editor
2. **Click "Analyze Code"** to get comprehensive analysis
3. **Explore the results** in three tabs:
   - **Line-by-Line**: Click any line for detailed explanations
   - **Code Review**: See categorized findings and suggested fixes
   - **Debug Console**: View execution results (JavaScript only)

### Advanced Features
- **Language Override**: Use the dropdown to manually set the language
- **Run JavaScript**: Execute JS code safely in the browser
- **Export Reports**: Download HTML reports of your analysis
- **Keyboard Shortcuts**:
  - `Ctrl+Enter`: Analyze code
  - `Ctrl+Shift+Enter`: Run JavaScript
  - `Ctrl+K`: Clear code

## 🏗️ Architecture

### File Structure
```
codeanalyzer/
├── index.html              # Main application page
├── css/styles.css          # Comprehensive styling
├── js/
│   ├── detector.js         # Language detection engine
│   ├── explainers/         # Line-by-line explanation modules
│   │   ├── javascript.js
│   │   ├── python.js
│   │   ├── java.js
│   │   ├── html.js
│   │   ├── css.js
│   │   └── sql.js
│   ├── reviewers/          # Code review analysis modules
│   │   ├── javascript.js
│   │   ├── python.js
│   │   ├── java.js
│   │   ├── html.js
│   │   ├── css.js
│   │   └── sql.js
│   ├── runner.js           # Safe JavaScript execution
│   └── ui.js              # User interface controller
├── vendor/                 # Local dependencies
│   ├── prism.js           # Syntax highlighting
│   └── prism.css
├── images/
│   └── logo.svg
├── manifest.webmanifest   # PWA configuration
├── service-worker.js      # Offline functionality
└── README.md
```

### Core Components

#### 🎯 Language Detection (`detector.js`)
- Rule-based pattern matching
- Confidence scoring algorithm
- Support for 7+ languages
- Extensible architecture for new languages

#### 📝 Code Explainers (`explainers/`)
- Language-specific explanation engines
- Syntax concept definitions
- Error detection and suggestions
- Beginner-friendly terminology

#### 🔍 Code Reviewers (`reviewers/`)
- Multi-category analysis (Syntax, Logic, Style, Security, Performance)
- Severity classification (Error, Warning, Info)
- Actionable suggestions with code examples
- Best practices enforcement

#### 🏃 JavaScript Runner (`runner.js`)
- Sandboxed execution environment
- Console output capture
- Error handling and stack traces
- Security restrictions and timeouts

## 🛠️ Supported Languages

| Language   | Detection | Explanations | Code Review | Execution |
|------------|-----------|--------------|-------------|-----------|
| JavaScript | ✅        | ✅           | ✅          | ✅        |
| Python     | ✅        | ✅           | ✅          | ❌        |
| Java       | ✅        | ✅           | ✅          | ❌        |
| HTML       | ✅        | ✅           | ✅          | ❌        |
| CSS        | ✅        | ✅           | ✅          | ❌        |
| SQL        | ✅        | ✅           | ✅          | ❌        |
| Shell      | ✅        | ❌           | ❌          | ❌        |

## 🔧 Technical Details

### Browser Compatibility
- **Modern browsers** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- **ES6+ features** required
- **Service Worker** support for offline functionality
- **Web Workers** for safe code execution

### Performance
- **Client-side processing** - no server dependencies
- **Lazy loading** of analysis modules
- **Efficient DOM manipulation** with minimal reflows
- **Memory management** for large code files

### Security
- **Sandboxed execution** environment for JavaScript
- **No external network requests** during analysis
- **XSS protection** with proper HTML escaping
- **CSP-compliant** code structure

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Languages
1. Create detection patterns in `js/detector.js`
2. Add explainer module in `js/explainers/[language].js`
3. Add reviewer module in `js/reviewers/[language].js`
4. Update the UI language dropdown
5. Add tests and documentation

### Improving Analysis
- Enhance existing language support
- Add new code review categories
- Improve explanation quality
- Add more syntax patterns

### Bug Reports & Feature Requests
Please use the issue tracker to report bugs or suggest features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Prism.js** for syntax highlighting
- **Modern CSS** techniques for responsive design
- **Web Standards** for offline functionality
- **Open Source Community** for inspiration and best practices

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Use the GitHub issue tracker
- **Community**: Join discussions in the repository

---

**CodeAnalyzer** - Making code analysis accessible to everyone, one line at a time. 🚀
