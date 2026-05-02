namespace SnapTalesAPI.Models.DTOs
{
    public record FindOrCreateRequest(
        string? Name,
        string? Email,
        string? Phone,
        string? FirebaseUid
    );

    public record UpdateUserRequest(
        string? Name,
        string? AvatarUrl
    );

    public record AddressRequest(
        string? Label,
        string FullName,
        string Phone,
        string Line1,
        string City,
        string State,
        string PinCode
    );

    public record UserResponse(
        Guid Id,
        string? Name,
        string? Email,
        string? Phone,
        int Role,
        string? AvatarUrl,
        string? FirebaseUid,
        List<AddressResponse> Addresses,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );

    public record AuthResponse(UserResponse User, string Token);

    public record AddressResponse(
        string? Label,
        string FullName,
        string Phone,
        string Line1,
        string City,
        string State,
        string PinCode
    );
}
