import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { error: Error | null; info: string; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, info: '' };

  static getDerivedStateFromError(error: Error) { return { error, info: error.message }; }
  componentDidCatch(error: Error, info: ErrorInfo) { this.setState({ info: info.componentStack || '' }); }

  render() {
    if (this.state.error) {
      return (
        <div className="p-8 max-w-2xl mx-auto mt-8">
          <div className="glass-card rounded-2xl p-6 border-red-200 bg-red-50/50">
            <h2 className="text-lg font-bold text-red-700 mb-2">Lỗi khi tải trang</h2>
            <p className="text-red-600 font-mono text-sm mb-4">{this.state.error.message}</p>
            <details>
              <summary className="cursor-pointer text-sm text-red-500 font-medium">Stack trace</summary>
              <pre className="mt-2 text-xs text-red-400 overflow-auto max-h-60 p-2 bg-red-50 rounded-lg">{this.state.info}</pre>
            </details>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold">
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
