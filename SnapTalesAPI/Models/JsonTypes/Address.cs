namespace SnapTalesAPI.Models.JsonTypes
{
    public class Address
    {
        public string? Label { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Line1 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string PinCode { get; set; } = string.Empty;
    }
}
