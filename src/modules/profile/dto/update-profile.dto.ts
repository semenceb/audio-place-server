export class UpdateProfileDto {
  public constructor(
    readonly name?: string,
    readonly about?: string | null,
    readonly friendsCount?: number | null,
    readonly streamsCount?: number | null,
    readonly profilePicture?: string | null,
  ) {}
}
