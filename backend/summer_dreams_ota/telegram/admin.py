from django.contrib import admin

from summer_dreams_ota.telegram.models import ChatMessage, ChatSession


class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ("created_at", "updated_at")


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ("session_id", "name", "contact", "created_at", "is_active")
    search_fields = ("name", "contact", "session_id")
    list_filter = ("is_active", "created_at")
    inlines = [ChatMessageInline]
    readonly_fields = ("session_id", "created_at", "updated_at")


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("session", "sender", "message_text", "created_at")
    list_filter = ("sender", "created_at")
    search_fields = ("message_text", "session__name", "session__session_id")
    readonly_fields = ("created_at", "updated_at")
