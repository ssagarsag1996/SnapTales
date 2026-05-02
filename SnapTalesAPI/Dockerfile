# ----------- BUILD STAGE -----------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy everything from repo root
COPY . .

# Move to API project
WORKDIR /src/SnapTalesAPI

# Restore using csproj explicitly
RUN dotnet restore SnapTalesAPI.csproj

# Publish
RUN dotnet publish SnapTalesAPI.csproj -c Release -o /app

# ----------- RUNTIME STAGE -----------
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /app .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "SnapTalesAPI.dll"]
