// backend/src/API/Converters/TimeSpanConverter.cs
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MedicalCamp.API.Converters;

public class TimeSpanConverter : JsonConverter<TimeSpan>
{
    public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (string.IsNullOrEmpty(value))
            return TimeSpan.Zero;

        // Handle HH:MM format
        if (TimeSpan.TryParse(value, out var timeSpan))
            return timeSpan;

        // Handle HH:MM:SS format
        if (value.Split(':').Length == 2)
            value += ":00";

        return TimeSpan.TryParse(value, out timeSpan) ? timeSpan : TimeSpan.Zero;
    }

    public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(@"hh\:mm"));
    }
}