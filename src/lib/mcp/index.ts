import { MCPConfig, TokenCounter, ContextManager } from './types';

export class MCPManager {
  private config: MCPConfig;
  private tokenCounter: TokenCounter;
  private contextManager: ContextManager;

  constructor(config: MCPConfig) {
    this.config = config;
    this.tokenCounter = new TokenCounter(config.tokenOptions);
    this.contextManager = new ContextManager(config.contextOptions);
  }

  async initialize() {
    await this.contextManager.initialize();
    await this.tokenCounter.initialize();
  }

  async optimizeTokens(content: string): Promise<string> {
    const tokenCount = await this.tokenCounter.count(content);
    if (tokenCount > this.config.tokenOptions.maxTokens) {
      return await this.tokenCounter.optimize(content);
    }
    return content;
  }

  async saveContext(key: string, data: any) {
    await this.contextManager.save(key, data);
  }

  async loadContext(key: string): Promise<any> {
    return await this.contextManager.load(key);
  }

  async clearContext(key: string) {
    await this.contextManager.clear(key);
  }

  getStats() {
    return {
      tokenUsage: this.tokenCounter.getStats(),
      contextSize: this.contextManager.getSize(),
      uptime: process.uptime()
    };
  }
}