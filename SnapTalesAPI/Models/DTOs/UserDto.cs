namespace SnapTalesAPI.Models.DTOs
{
    /// <summary>Request body for POST /api/auth/google</summary>
    public record GoogleAuthRequest(string IdToken);

    public record UpdateUserRequest(
        string? Name,
        string? AvatarUrl,
        string? Phone
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
