export class EnvManager {
	public static get CLICKUP_PERSONAL_TOKEN(): string {
		return Bun.env.CLICKUP_PERSONAL_TOKEN as string;
	}
}
