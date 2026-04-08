export interface AgentProfile {
	id: string;
	name: string;
	role: string;
	model: string;
	temperature: string;
	status: 'detected' | 'standby' | 'beta';
}

export interface SkillProfile {
	id: string;
	name: string;
	trigger: string;
	scope: 'system' | 'project';
}

export interface MemoryToggle {
	key: 'projectPersistence' | 'sessionPersistence';
	label: string;
	description: string;
	defaultOn: boolean;
}

export interface ConfigPresetCommand {
	tool: string;
	command: string;
}

export interface ConfigPreset {
	id: string;
	label: string;
	description: string;
	agentIds: AgentProfile['id'][];
	skillIds: SkillProfile['id'][];
	commands: ConfigPresetCommand[];
	note: string;
}

export interface ConfiguratorData {
	agents: AgentProfile[];
	skills: SkillProfile[];
	memoryToggles: MemoryToggle[];
	presets: ConfigPreset[];
}

export const agentProfiles: AgentProfile[] = [
	{
		id: 'gentle-architect',
		name: 'gentle-architect',
		role: 'System design, specification planning, and architecture tradeoff analysis',
		model: 'gentle-core-architect',
		temperature: '0.1',
		status: 'detected',
	},
	{
		id: 'gentle-worker',
		name: 'gentle-worker',
		role: 'Implementation execution with deterministic task progression',
		model: 'gentle-core-worker',
		temperature: '0.2',
		status: 'detected',
	},
	{
		id: 'gentle-verifier',
		name: 'gentle-verifier',
		role: 'Spec compliance checks, verification gates, and release readiness',
		model: 'gentle-core-verifier',
		temperature: '0.0',
		status: 'detected',
	},
	{
		id: 'gentle-analyst',
		name: 'gentle-analyst',
		role: 'Cross-artifact audit trails, traceability checks, and documentation review',
		model: 'gentle-core-analyst',
		temperature: '0.1',
		status: 'standby',
	},
];

export const skillProfiles: SkillProfile[] = [
	{
		id: 'sdd-spec',
		name: 'sdd-spec',
		trigger: 'Define requirements and executable acceptance scenarios',
		scope: 'project',
	},
	{
		id: 'sdd-design',
		name: 'sdd-design',
		trigger: 'Convert approved specs into architecture and interface contracts',
		scope: 'project',
	},
	{
		id: 'sdd-apply',
		name: 'sdd-apply',
		trigger: 'Implement task batches with deterministic checklist progress',
		scope: 'project',
	},
	{
		id: 'sdd-verify',
		name: 'sdd-verify',
		trigger: 'Validate implementation against specs, design, and task evidence',
		scope: 'project',
	},
	{
		id: 'memory-persistence',
		name: 'memory-persistence',
		trigger: 'Capture project and session context across iterative delivery cycles',
		scope: 'system',
	},
];

export const memoryToggles: MemoryToggle[] = [
	{
		key: 'projectPersistence',
		label: 'Project persistence (cross-session technical memory)',
		description: 'Stores architecture decisions, bugfixes, and conventions for the project timeline.',
		defaultOn: true,
	},
	{
		key: 'sessionPersistence',
		label: 'Session persistence (working context continuity)',
		description: 'Preserves in-progress context and checkpoints during active implementation sessions.',
		defaultOn: true,
	},
];

export const configPresets: ConfigPreset[] = [
	{
		id: 'strict-sdd',
		label: 'Strict SDD',
		description: 'Enforces proposal → spec → design → task execution with gated verification.',
		agentIds: ['gentle-architect', 'gentle-worker', 'gentle-verifier'],
		skillIds: ['sdd-spec', 'sdd-design', 'sdd-apply', 'sdd-verify', 'memory-persistence'],
		commands: [
			{ tool: 'gentle-ai', command: 'sdd init --strict' },
			{ tool: 'gentle-ai', command: 'sdd spec stitch-rebuild' },
			{ tool: 'gentle-ai', command: 'sdd apply stitch-rebuild --phase 4' },
		],
		note: '# Strict gates enabled\n# Work is blocked until spec, design, and tasks are complete.',
	},
	{
		id: 'rapid-prototype',
		label: 'Rapid Prototype',
		description: 'Optimizes for fast UI iteration while preserving baseline project memory.',
		agentIds: ['gentle-architect', 'gentle-worker'],
		skillIds: ['sdd-spec', 'sdd-apply', 'memory-persistence'],
		commands: [
			{ tool: 'gentle-ai', command: 'sdd init --light' },
			{ tool: 'gentle-ai', command: 'sdd propose ui-prototype' },
			{ tool: 'gentle-ai', command: 'sdd apply ui-prototype --skip-noncritical-checks' },
		],
		note: '# Lightweight planning path\n# Prioritizes fast UI iteration while preserving internal documentation.',
	},
	{
		id: 'audit-mode',
		label: 'Audit Mode',
		description: 'Runs evidence-first verification and highlights traceability gaps.',
		agentIds: ['gentle-verifier', 'gentle-analyst'],
		skillIds: ['sdd-verify', 'memory-persistence'],
		commands: [
			{ tool: 'gentle-ai', command: 'sdd verify stitch-rebuild --report detailed' },
			{ tool: 'gentle-ai', command: 'memory inspect --scope project' },
			{ tool: 'gentle-ai', command: 'sdd trace stitch-rebuild --format summary' },
		],
		note: '# Validation-first profile\n# Generates evidence-focused output for architecture review.',
	},
];

export const configuratorData: ConfiguratorData = {
	agents: agentProfiles,
	skills: skillProfiles,
	memoryToggles,
	presets: configPresets,
};
